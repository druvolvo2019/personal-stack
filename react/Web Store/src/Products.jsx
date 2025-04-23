import Product from "./Product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "./fetcher";

export default function Products() {
    const { data: products } = useSuspenseQuery({
        queryKey: ["products-list"],
        queryFn: () => get("products-list"),
    });

    return (<>
        <title>Products | SuperM</title>
        <div className="products-title">
            <h1>Products</h1>
        </div>
        <div className="products-grid">
            {products.map(product => <Product key={product.id} details={product} />)}
        </div>
    </>);
}