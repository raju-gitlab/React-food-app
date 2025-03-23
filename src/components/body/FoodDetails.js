import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../Assets/css/card.css';

const Card = (data) => (
    <div className="card col-3" style={{ maxWidth: "19rem", border: "none" }}>
        <div className="position-relative">
            <img
                style={{ objectFit: "cover", height: "234px", borderRadius: "20px" }}
                alt={data.data.card.card.info.name}
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${data.data.card.card.info.cloudinaryImageId}`}
            />
        </div>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title font-weight-bold mb-0">{data.data.card.card.info.name}</h5>
                <div className="d-flex align-items-center">
                    <span className="text-success font-weight-bold">{data.data.card.card.info.avgRating}</span>
                    <i className="fas fa-star text-success ml-1"></i>
                </div>
            </div>
            <p className="card-text text-muted mt-2 mb-1">{data.data.card.card.info.cuisines.join(' . ')}</p>
            <p className="card-text text-muted mb-1">{data.data.card.card.info.costForTwo}</p>
            <p className="card-text text-muted mb-1">
                {data.data.card.card.infoareaName} ,{data.data.card.card.info.locality},
                <span className="ml-2">{data.data.card.card.info.sla.lastMileTravelString}</span>
                ,{data.data.card.card.info.sla.slaString}
            </p>
            <button className="btn btn-light btn-sm text-muted mt-2 disabled">
                <i className="fas fa-utensils mr-1"></i>
                Table booking
            </button>
        </div>
    </div>
);


const FoodDetails = () => {
    const [restraunts, setRestraunts] = useState([]);
    const [foodtypespec, setFoodtypespec] = useState({});
    const [isLoadMore, setisLoadMore] = useState(false);
    const [nextOffset, setNextOffset] = useState("");
    const [csrf, setCsrf] = useState("");
    const params = useParams();

    function loadMore() {
        const latlon = localStorage.getItem('latlon').split(',');
        let PostObj = new Object();
        PostObj.collection = params.collectionId;
        PostObj.lat = latlon[0];
        PostObj.lon = latlon[1];
        PostObj.nextOffset = nextOffset;
        PostObj.tags = params.tags;
        PostObj.type = params.type;
        PostObj.type = csrf;


        fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'sec-fetch-mode' : 'cors',
                'referer' : 'https://www.swiggy.com/collections/83637?collection_id=83637&search_context=burger&tags=layout_CCS_Burger&type=rcv2',
            },
            method: "POST",
            body: JSON.stringify(PostObj)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        if (restraunts.length === 0) {
            const latlon = localStorage.getItem('latlon').split(',');
            fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latlon[0]}&lng=${latlon[1]}&collection=${params.collectionId}&tags=${params.tags}&sortBy=&filters=&type=${params.type}&offset=0&page_type=null`)
                .then((response) => response.json())
                .then((data) => {
                    setRestraunts(data.data.cards.slice(3));
                    setisLoadMore(true);
                    setNextOffset(data.data.pageOffset.nextOffset);
                    setCsrf(data.data.csrfToken);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    });

    return (
        <>
            <div className="row gap-3" style={{ paddingTop: "100px", paddingLeft: "58px", paddingRight: "20px", paddingBottom: "20px" }}>
                {
                    restraunts.length === 0 ? <p></p> : restraunts.map((restr) => <Card data={restr} />)
                }
            </div>
        </>
    );
}

export default FoodDetails;