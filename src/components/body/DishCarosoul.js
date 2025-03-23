import { Link } from 'react-router-dom';
import '../../Assets/css/card.css'
const Card = (data) => (
    // data.dataProps
    <Link to={"/food/" + data.data.action.text + "/" + data.dataProps.collection_id + "/0/" + data.dataProps.type + "/" + data.dataProps.tags} style={{ maxWidth: "14rem", background: "transparent", border: "none" }}>
        <div className="card" style={{ maxWidth: "14rem", minWidth: "14rem", background: "transparent", border: "none" }}>
            <div className="position-relative" style={{ left: 0, transform: "translate(10px,10px)", top: 0 }}>
                <img
                    style={{ width: "200px", height: "200px" }}
                    alt="{data.data.info.name}"
                    className="card-img-top"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${data.data.imageId}`}
                />
            </div>
            <div className="card-body">

            </div>
        </div>
    </Link>
);

const makeURLQueryData = (urlInfo) => {
    const params = new URL(urlInfo).searchParams;
    const queryParams = {};
    params.forEach((value, key) => {
        queryParams[key] = value;
    });
    return queryParams;
};

const CardContainer = (props) => (
    <div className="cards-container">
        {
            props.cards.map((card) => (
                <Card data={card} dataProps={makeURLQueryData(card.entityId)} />
            ))
        }
    </div>
);

function DishCarosoul(propsData) {
    return (
        propsData.data != undefined && propsData.data.length != 0 ?
            <div >
                <CardContainer cards={propsData.data} />
            </div>
            :
            <div>
                <p>
                    lotem
                </p>
            </div>
    );
}

export default DishCarosoul;