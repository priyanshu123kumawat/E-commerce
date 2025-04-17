import { useQuery } from 'react-query';
import React from 'react'
import "./Features.css";
import { BallTriangle } from 'react-loader-spinner'


const fetchCategory = async () => {
    const response = await fetch("http://localhost:2000/api/category/find-category");
    if (!response.ok) {
        throw new Error('network response was not ok');
    }
    return response.json();
};


const Feature = () => {

    const { isloading, error, data } = useQuery(['getCategory'], fetchCategory);

    if (isloading) return (<BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />);

    if (error) {
        return (
            <div>
                Error:{error.message}
            </div>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="sell_products">
                    {
                        data && data.data.map((element, index) => (
                            <div className='category' key={index}>
                                <div className="pro_image">
                                    <img src={element.image} alt="category" />
                                </div>
                                <div className="pro_name">
                                    <h4>{element.category}</h4>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Feature