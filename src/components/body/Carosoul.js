import '../../Assets/css/card.css'
const Card = (data) => (

    <div className="card shadow-sm" style={{ maxWidth: "22rem" }}>
        <div className="position-relative">
            <img
                style={{ objectFit: "cover", height: "234px" }}
                alt={data.data.info.name}
                className="card-img-top"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${data.data.info.mediaFiles.filter(item => item.type === "IMAGE")[0].url}`}
            />
            <div className="card-img-overlay p-2">
                <span className="badge badge-custom">GIRF SPECIAL</span>
            </div>
        </div>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{data.data.info.name}</h5>
                <div className="d-flex align-items-center">
                    <span className="text-success font-weight-bold">4.3</span>
                    <i className="fas fa-star text-success ml-1"></i>
                </div>
            </div>
            <p className="card-text text-muted mt-2 mb-1">Chinese • North Indian</p>
            <p className="card-text text-muted mb-1">₹2200 for two</p>
            <p className="card-text text-muted mb-1">
                Galaxy Blue Sapphire Plaza, Sector 4, Noida 1
                <span className="ml-2">5 km</span>
            </p>
            <button className="btn btn-light btn-sm text-muted mt-2">
                <i className="fas fa-utensils mr-1"></i>
                Table booking
            </button>
            <button className="btn btn-custom btn-block mt-3 d-flex justify-content-between align-items-center">
                <span>
                    <i className="fas fa-percentage mr-2"></i>
                    Flat 50% off on pre-booking
                </span>
                <span className="text-success">+ 5 more</span>
            </button>
            <button className="btn btn-secondary-custom btn-block mt-2">
                Up to 10% off with bank offers
            </button>
        </div>
    </div>

);

const CardContainer = (props) => (
    <div className="cards-container">
        {
            props.cards.map((card) => (
                <Card data={card} />
            ))
        }
    </div>
);

const gatherRestraunts = (arrs, restraunts = []) => {
    arrs.data.forEach((cvp) => {
        restraunts.push(...cvp.stackedDetails.dineoutRestaurants.restaurants)
    })
    return restraunts;
};

function Carosoul(propsData) {
    return (

        propsData.data != undefined && propsData.data.length != 0 ?
            <div >
                <CardContainer cards={gatherRestraunts(propsData, [])} />
            </div>
            :
            <div>
                <p>
                    lotem
                </p>
            </div>
    );
}

export default Carosoul;