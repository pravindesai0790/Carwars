using AutionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePriceGtZero_True()
    {
        // arrange
        var auction = new Auction { Id = Guid.NewGuid(), ReservedPrice = 10 };

        // act
        var result = auction.HasReservePrice();

        // assert
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePriceIsZero_False()
    {
        // arrange
        var auction = new Auction { Id = Guid.NewGuid(), ReservedPrice = 0 };

        // act
        var result = auction.HasReservePrice();

        // assert
        Assert.False(result);
    }
}