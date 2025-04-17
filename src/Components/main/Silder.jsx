import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "./Silder.css"

const Silder = () => {
    return (
        <div className='container'>
            <Carousel data-bs-theme="dark" style={{ marginBottom: '2rem',marginTop: '1rem' }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/44fe68e438b997c9.webp"
                        alt="First slide"
                        style={{ height: '180px' }}
                    />
                    {/* <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/3629090ec98a75c1.webp"
                        alt="Second slide"
                        style={{ height: '180px' }}
                    />
                    {/* <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/c97716b62a6674f2.webp"
                        alt="Third slide"
                        style={{ height: '180px' }}
                    />
                    {/* <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Silder