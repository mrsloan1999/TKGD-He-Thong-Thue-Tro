import React, { useState, useEffect } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import { API_URL, CLOUD_IMG } from "../config/index";
import NumberFormat from "react-number-format";

function Home() {
    const [rooms, setRooms] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: 0, value: null });
    const [selectedDistrict, setSelectedDistrict] = useState({ id: 0, value: null });
    const [selectedWard, setSelectedWard] = useState({ id: 0, value: null });
    const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';

    useEffect(async () => {
        if (rooms) {
            await fetch(API_URL + "room", { method: 'GET' }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
                setRooms(data);
            }).catch((error) => {
                return error;
            });
        }

        getCities();
    }, []);

    const getCities = () => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.data) {
                    setCities(myJson.data);
                }
            });
    };

    const getDistricts = () => {
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var listDistrictByProvince = [];
                myJson.data.map((item) => {
                    if (item.ProvinceID == selectedCity.id) {
                        listDistrictByProvince = [...listDistrictByProvince, item];
                    }
                });
                setDistricts(listDistrictByProvince);
            });
    };

    const getWards = () => {
        console.log(selectedDistrict);
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict.id}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.data) {
                    setWards(myJson.data);
                }
            });
    };

    useEffect(() => {
        if (selectedCity) {
            getDistricts();
        }
        console.log(rooms);
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            getWards();
        }
    }, [selectedDistrict]);

    const handleSelectCity = (value) => {
        var valueSplitted = value.split(',');
        setSelectedCity({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
        setWards([]);
    };

    const handleSelectDistrict = (value) => {
        var valueSplitted = value.split(',');
        setSelectedDistrict({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
    };

    const handleSelectWard = (value) => {
        var valueSplitted = value.split(',');
        setSelectedWard({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
    };

    const handleSearchByPlaces = () => {
        const searchData = {
            city: (selectedCity.value) ? selectedCity.value : "",
            district: (selectedDistrict.value) ? selectedDistrict.value : "",
            ward: (selectedWard.value) ? selectedWard.value : "",
        }

        console.log(searchData);

        fetch(`${API_URL}room/search-room`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setRooms(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Carousel className="banner">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className="text-white text-shadow size-40px">K??nh th??ng tin Ph??ng Tr??? s??? 1 Vi???t Nam</h3>
                        <p className="text-shadow size-20px">K??nh th??ng tin Ph??ng Tr??? s??? 1 Vi???t Nam - Website ????ng tin cho thu?? ph??ng tr???, nh?? nguy??n c??n,
                            c??n h???, ??? gh??p nhanh, hi???u qu??? v???i 100.000+ tin ????ng v?? 2.500.000 l?????t xem m???i th??ng.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-2.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className="text-white text-shadow size-40px">Chi ph?? th???p, hi???u qu??? t???i ??a</h3>
                        <p className="text-shadow size-20px">Kh??ng ph???i t???n nhi???u c??ng s???c v?? chi ph?? cho vi???c ????ng tin cho thu??: t??? vi???c ph??t t??? r??i, d??n
                            gi???y, v?? ????ng l??n c??c website kh??c nh??ng hi???u qu??? kh??ng cao.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-3.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className="text-white text-shadow size-40px">B???n ??ang c?? ph??ng tr??? / c??n h??? cho thu???</h3>
                        <p className="text-shadow size-20px">Kh??ng ph???i lo t??m ng?????i cho thu??, ph??ng tr???ng k??o d??i</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <section className="search-sec">
                <div className="container">
                    <form action="#" method="post" noValidate="novalidate">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    {/* <div className="col-lg-6 col-12 p-0">
                                        <input type="text" className="form-control search-slt"
                                               placeholder="T??m ki???m"/>
                                    </div> */}
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="province" onChange={(e) => handleSelectCity(e.target.value)}>
                                            <option value="">Ch???n t???nh th??nh</option>
                                            {
                                                cities.map((item, index) => {
                                                    return <option key={index}
                                                        value={`${item.ProvinceID},${item.ProvinceName}`}>{item.ProvinceName}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="district" onChange={(e) => handleSelectDistrict(e.target.value)}>
                                            <option value="">Ch???n qu???n huy???n</option>
                                            {
                                                districts.map((item, index) => {
                                                    return <option key={index}
                                                        value={`${item.DistrictID},${item.DistrictName}`}>{item.DistrictName}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="ward" onChange={(e) => handleSelectWard(e.target.value)}>
                                            <option value="">Ch???n ph?????ng x??</option>
                                            {
                                                wards.map((item, index) => {
                                                    return <option key={index}
                                                        value={`${item.WardCode},${item.WardName}`}>{item.WardName}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <button onClick={(e) => handleSearchByPlaces()} type="button" className="btn bg-gradient btn-danger wrn-btn">T??m ki???m
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <div className="container py-5 w-75">
                <div className="row room-items">
                    {rooms.filter(val => val.status === 1).map((item, i) => {
                        let img = "no-img.png";
                        if (typeof item.image !== 'undefined' && item.image.length) {
                            if (typeof item.image[0].name !== 'undefined') {
                                img = item.image[0].name;
                            }
                        }
                        return (
                            <div key={i} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top"
                                        src={`${CLOUD_IMG}${img}`} />
                                    <Card.Body>
                                        <Card.Title>{item.address && item.address}</Card.Title>
                                        <Card.Text>
                                            Gi??: <span className="fw-bold"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />

                                            {item.addition_infor && item.addition_infor} <br />

                                            {item.district.name &&
                                                <>
                                                    {item.district.prefix}: {item.district.name} <br />
                                                </>
                                            }
                                            {item.ward.name &&
                                                <>
                                                    {item.ward.prefix}: {item.ward.name} <br />
                                                </>
                                            }
                                            {item.province && item.province.name}
                                        </Card.Text>
                                        <a href={`/room/${item.id}`} className="cs-btn-detail btn btn-default text-white">Chi ti???t</a>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="container text-center mb-5 pb-5">
                <div className="border-bottom mb-3 pb-3">
                    <h3 className="fw-bold">T???i sao n??n s??? d???ng Nh?? Tr??? Vi???t Nam?</h3>
                </div>
                <div className="row">
                    <div className="col-3">
                        <img loading="lazy" decoding="async" width="150" height="150"
                             // style="object-fit: contain; object-position: 50% 50%;"
                             src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008495760-d92160ea2b56fc1128cbdff93aa43774.png?tr=h-150,q-75,w-150"/>
                        <h5 className="fw-bold">Gi???i ph??p t??m nh?? tr??? ti???n d???ng</h5>
                    </div>
                    <div className="col-3">
                        <img importance="low" loading="lazy" decoding="async" width="150" height="150"
                             src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008504598-6c1d5675c41e47eee0b27c59c07a2bbd.png?tr=h-150,q-75,w-150"/>
                        <h5 className="fw-bold">Gi?? r??? h??n b???t c??? ????u</h5>
                    </div>
                    <div className="col-3">
                        <img importance="low" loading="lazy" decoding="async" width="150" height="150"
                             src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008514239-c1d0a51538cd02053c9b1a6c567fe5b5.png?tr=h-150,q-75,w-150"/>
                        <h5 className="fw-bold">Ph????ng th???c thanh to??n an to??n v?? linh ho???t</h5>
                    </div>
                    <div className="col-3">
                        <img importance="low" loading="lazy" decoding="async" width="150" height="150"
                             src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008521046-3cee046bb3ddb863398300f89d83c0f9.png?tr=h-150,q-75,w-150"/>
                        <h5 className="fw-bold">Ph????ng th???c thanh to??n an to??n v?? linh ho???t</h5>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;