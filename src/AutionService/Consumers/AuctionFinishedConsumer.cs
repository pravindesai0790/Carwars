using System;
using AutionService.Data;
using AutionService.Entities;
using Contracts;
using MassTransit;

namespace AutionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly AuctionDbContext _dbcontext;

        public AuctionFinishedConsumer(AuctionDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            Console.WriteLine("--> Consuming auction finished");

            var auction = await _dbcontext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

            if(context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = context.Message.Amount;
            }

            auction.Status = auction.SoldAmount > auction.ReservedPrice
                ? Status.Finished : Status.ReserveNotMet;

            await _dbcontext.SaveChangesAsync();
        }
    }
}
