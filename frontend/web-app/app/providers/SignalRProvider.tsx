'use client'

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { useAuctionStore } from "../hooks/useAuctionStore"
import { useBidStore } from "../hooks/useBidStore"
import { useParams } from "next/navigation"
import { Auction, AuctionFinished, Bid } from "@/types"
import { User } from "next-auth"
import toast from "react-hot-toast"
import AuctionCreatedToast from "../components/AuctionCreatedToast"
import { getDetailedViewData } from "../actions/auctionActions"
import AuctionFinishedToast from "../components/AuctionFinihedToast"

type Props = {
    children: ReactNode
    user: User | null
    notifyURL: string
}

export default function SignalRProvider({ children, user, notifyURL }: Props) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const connection = useRef<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{id: string}>();

    const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
        const auction = getDetailedViewData(finishedAuction.auctionId);
        return toast.promise(auction, {
            loading: 'Loading...',
            success: (auction) => 
                <AuctionFinishedToast 
                    auction={auction}
                    finishedAuction={finishedAuction}
                />,
            error: (err) => 'Auction finished'
        }, {success: {duration: 10000, icon: null}});
    }, [])

    const handleAuctionCreated  = useCallback((auction: Auction) => {
        if(user?.username !== auction.seller) {
            return toast(<AuctionCreatedToast auction={auction} />, {
                duration: 10000
            })
        }
    }, [user?.username])

    const handleBidPlaced = useCallback((bid: Bid) => {
        if(bid.bidStatus.includes('Accepted')) {
            setCurrentPrice(bid.auctionId, bid.amount);
        }

        if(params.id === bid.auctionId) {
            addBid(bid);
        }

    }, [setCurrentPrice, addBid, params.id])

    useEffect(() => {
        if(!connection.current) {
            connection.current = new HubConnectionBuilder()
                .withUrl(notifyURL)
                .withAutomaticReconnect()
                .build();
            
            connection.current.start()
                .then(() => 'Connected to notification hub')
                .catch(err => console.log(err));
        }

        connection.current.on('BidPlaced', handleBidPlaced);
        connection.current.on('AuctionCreated', handleAuctionCreated);
        connection.current.on('AuctionFinished', handleAuctionFinished);

        return () => {
            connection.current?.off('BidPlaced', handleBidPlaced);
            connection.current?.off('AuctionCreated', handleAuctionCreated);
            connection.current?.off('AuctionFinished', handleAuctionFinished);
        }

    }, [handleBidPlaced, handleAuctionCreated, handleAuctionFinished, notifyURL]);

    return (
        children
    )
}