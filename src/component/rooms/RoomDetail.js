import React, { useState, useEffect } from 'react';
import ImageSlider from "./ImageSlider";
import { API_URL } from "../../config/index";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RoomDetail = (props) => {
    const {match} = props;
    const id = match.params.id;
    const [isShowPhone,setShowPhone] = useState(false);
    const [isFavourite,setFavourite] = useState(false);

    const [room, setRoom] = useState({});

    useEffect(() => {
        if (id >= 0) {
            const url = `${API_URL}room/searchByRoomId/${id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (typeof data.length !== 'undefined') {
                        if(typeof data[0].post[0] !== 'undefined') {
                            data[0].post = data[0].post[0];
                        }
                        if(!data[0].image.length){
                            data[0].image = [
                                'https://img.thuephongtro.com/images/large/2020/08/31/20200831093705-mofks.jpg',
                                'https://img.thuephongtro.com/images/large/2020/08/31/20200831093803-ykuu4.jpg',
                                'https://img.thuephongtro.com/images/large/2020/08/31/20200831093803-otbau.jpg'
                            ]
                        }
                        if(data[0].host.phone)
                            data[0].host.phoneHide = `xxxxxx${data[0].host.phone.slice(data[0].host.phone.length - 4)}`;
                        setRoom(data[0]);
                    }
                });
        }
    }, []);

    function showFullPhone(){
        setShowPhone(true);
    }

    function favourite(){
        setFavourite(!isFavourite);
    }

    const styleCardImage = {
        width: '11.5rem',
        borderRadius: '20%',
        textAlign:'center',
        alignSelf: 'center',
        marginTop:'2rem'
    }

    const styleButton = {
        width:'200px',
        margin:'5px 0'
    }

    return (
        <Container>
            <Row>
            <Col md={8}>
                <div className="mb-4">
                    {
                        Object.keys(room).length !== 0 ?
                            <div className="room-box" style={{margin:0,width:'100%'}}>
                                <div className="room-slide-img">
                                    <ImageSlider images={room.image} />
                                </div>
                                <br/>
                                <div style={{padding:'2rem'}}>
                                <h2>
                                   <b> {room.post.title ?? "Phòng trọ dạng căn hộ mini cao cấp tại 796 Lê Đức Thọ, P.15, Quận Gò Vấp"}</b>
                                </h2>
                                <p><b>Chuyên mục:</b> Thuê trọ sài gòn</p>
                                <p>
                                    <span className="bold">Địa chỉ: </span>{room.address},
                                    &nbsp;{room.ward},
                                    &nbsp;{room.district},
                                    &nbsp;{room.city}
                                </p>
                                <p>
                                    <span className="bold">Chi tiết: </span>
                                    {
                                        typeof room.addition_infor !== 'undefined' ? room.addition_infor: ""
                                    }
                                </p>
                                <p>
                                    <span className="bold">Dịch vụ: </span>
                                    {
                                        typeof room.post.service !== 'undefined' && Object.keys(room.post.service).length ?
                                            Object.entries(room.post.service).forEach((key, index) => {
                                                if(index > 0) {
                                                    return (
                                                        <span key={index}>{key[1]} </span>
                                                    )
                                                }
                                            })

                                            : `Cho thuê căn hộ mini cao cấp tại 796 Lê Đức Thọ, Phường 15, Quận Gò Vấp, Tp. Hồ Chí Minh.

                                            Diện tích 30m2, giá 2.5 triệu - 3 triệu/tháng.
                                            
                                            Có hầm giữ xe, có thang máy, giờ tự do, có bảo vệ 24/24.
                                            
                                            Wifi cực mạnh, máy nước nóng, trường hình cáp, sân tập thể dục và thư giãn. Chung cư cao cấp, an ninh tuyệt đối.
                                            
                                            .`
                                    }
                                </p>
                                <p>
                                    <span className="bold">Diện tích: </span> {room.area} (m2)
                                </p>
                                <p>
                                    <span className="bold">Giá cả: </span> {room.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                </p>
                                <p>
                                    <span
                                        className="bold">Liên Hệ: </span> {room.host.name} - {room.host.phone} - {room.host.email}
                                </p>
                                </div>
                            </div>
                            : ''
                    }

                </div>
            </Col>
            <Col>
                {
                    Object.keys(room).length !== 0 ?
                    <Card style={{textAlign:'center',margin:'32px 0'}}>
                    <Card.Img variant="top" src="https://www.w3schools.com/howto/img_avatar.png" style={styleCardImage} />
                    <Card.Body>
                        <Card.Title>{room.host.name}</Card.Title>
                        <Card.Text>
                        {!isShowPhone ? room.host.phoneHide:room.host.phone}
                        </Card.Text>
                        <Card.Text>
                        {room.host.email ?? ""}
                        </Card.Text>
                        <Button variant="primary" disabled={isShowPhone} onClick={showFullPhone} style={styleButton}>Hiện số điện thoại</Button>
                        <Button variant={!isFavourite ? 'primary':'danger'} style={styleButton} onClick={favourite}>Yêu thích</Button>
                        <Button variant="primary" style={styleButton}>Liên hệ</Button>
                    </Card.Body>
                </Card>:''
                }
            </Col>
            </Row>
        </Container>
    );
};

export default RoomDetail;