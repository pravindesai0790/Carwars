using AutionService.Controller;
using AutionService.Data;
using AutionService.RequestHelpers;
using AutoFixture;
using AutoMapper;
using MassTransit;
using Moq;

namespace AuctionService.UnitTests
{
    public class AuctionControllerTests
    {
        private readonly Mock<IAuctionRepository> _auctionRepo;
        private readonly Mock<IPublishEndpoint> _publishEndpoint;
        private readonly Fixture _fixture;
        private readonly IMapper _mapper;
        private readonly AuctionsController _controller;

        public AuctionControllerTests()
        {
            _fixture = new Fixture();
            _auctionRepo = new Mock<IAuctionRepository>();
            _publishEndpoint = new Mock<IPublishEndpoint>();

            var mockMapper = new MapperConfiguration(mc =>
            {
                mc.AddMaps(typeof(MappingProfiles).Assembly);   
            }).CreateMapper().ConfigurationProvider;

            _mapper = new Mapper(mockMapper);
            _controller = new AuctionsController(_auctionRepo.Object, _mapper, _publishEndpoint.Object);
        }
    }
}