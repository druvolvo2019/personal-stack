import { Link } from "react-router";
import Price from "./Price";

export default function Product(props) {
    return (
        <div className="product">
            <Link to={`/products/${props.details.id}`}>
                <img className="product-image" width="272" height="300" alt={props.details.name} src={props.details.thumbnail} />
                <p className="product-name">{props.details.name}</p>
                <div className="product-price">
                    <Price finalPrice={props.details.final_price} originalPrice={props.details.original_price} />
                </div>
            </Link>
        </div>
    );
}
