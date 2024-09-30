import React from 'react';
import './StockBasics.css'; 


const StockBasics = () => {
    return (
        <> 
            <div className='container'>
                <section className="row mt-5 intro">
                    <div className="col-md-7 col-sm-12">
                        <h1 className="fs-1">
                            Stock Market:
                            <div className='fs-3'>Your Introduction to Investing</div>
                        </h1>
                        <p className="fs-5 mt-3">
                            Welcome to your journey into the world of stock markets! This section provides a clear and concise introduction
                            to the fundamentals of investing, including how stock markets operate, key terms and concepts, and essential strategies for success.
                            Whether you're just starting out or looking to refresh your knowledge, this guide will equip you with the tools you need to make informed investment decisions.
                        </p>
                    </div>
                    <div className="col-md-5 col-sm-12 text-center">
                        <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722660105/TradingJournal/tegk6cpneikwitf1odsi.png" alt="Candlestick image" className="img-fluid" />
                    </div>
                </section>

                <section className='mt-4 row'>
                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666894/TradingJournal/fssvkstjqed8djjmmc1c.jpg" className="card-img-top img-fluid" alt="Introduction to stock market" />
                            <div className="card-body">
                                <h5 className="card-title">Introduction to stock market</h5>
                                <div className="card-text">
                                    The stock market is where securities are bought and sold.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%201_Introduction%20to%20Stock%20Markets.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666893/TradingJournal/vhmcrqwpmbbf3iievodk.avif" className="card-img-top img-fluid" alt="Technical analysis" />
                            <div className="card-body">
                                <h5 className="card-title">Technical analysis</h5>
                                <div className="card-text">
                                    Analyze charts, indicators, volume, patterns, and market sentiment.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%202_Technical%20Analysis.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666893/TradingJournal/mkdxhigklnwkpdh4vz53.avif" className="card-img-top img-fluid" alt="Fundamental analysis" />
                            <div className="card-body">
                                <h5 className="card-title">Fundamental analysis</h5>
                                <div className="card-text">
                                    Evaluates financial health, performance, and market potential.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%203_Fundamental%20Analysis.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='row mt-3'>
                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666893/TradingJournal/kgvnsspeyggppp2nmcvv.avif" className="card-img-top img-fluid" alt="Futures trading" />
                            <div className="card-body">
                                <h5 className="card-title">Futures trading</h5>
                                <div className="card-text">
                                    Financial agreements to buy or sell an asset at a predetermined price on a specified future date.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%204_Futures%20Trading.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666893/TradingJournal/mvjmdtngyzzokp6hofi2.jpg" className="card-img-top img-fluid" alt="Options trading" />
                            <div className="card-body">
                                <h5 className="card-title">Options trading</h5>
                                <div className="card-text">
                                    Options trading involves buying or selling contracts for future stock prices.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%205_Options-Theory-for-Professional-Trading.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 col-sm-6 mb-3'>
                        <div className="card hvr" style={{ width: '100%' }}>
                            <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1722666893/TradingJournal/pzykbuhixznyicltlczx.jpg" className="card-img-top img-fluid" alt="Risk management" />
                            <div className="card-body">
                                <h5 className="card-title">Risk management</h5>
                                <div className="card-text">
                                    Risk management in trading minimizes losses and maximizes potential gains.
                                </div>
                                <div className='text-body-secondary mb-1'>From Zerodha Varsity</div>
                                <a href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%209_Risk%20Management%20%26%20Trading%20Psychology.pdf" className="btn pdf">Open PDF</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default StockBasics;
