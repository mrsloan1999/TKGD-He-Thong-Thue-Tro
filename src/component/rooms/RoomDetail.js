import React, { useState, useEffect } from 'react';
import ImageSlider from "./ImageSlider";
import { API_URL } from "../../config/index";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import NumberFormat from "react-number-format";
import Button from 'react-bootstrap/Button';
import {  CLOUD_IMG } from "../../config/index";
import Map from '../map';

const RoomDetail = (props) => {
    const {match} = props;
    const id = match.params.id;
    const [isShowPhone,setShowPhone] = useState(false);
    const [isFavourite,setFavourite] = useState(false);

    const [room, setRoom] = useState({});
    const [rooms,setRooms] = useState([]);

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

    useEffect(async ()=>{
      await  fetchRooms();
    },[]);

    async function fetchRooms(){
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

    const styelCardImageRoom = {
        width: '90%',
        height: '200px',
        textAlign:'center',
        alignSelf: 'center',
        marginTop:'1rem'
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
                                   <b> {room.post.title ?? "Ph??ng tr??? d???ng c??n h??? mini cao c???p t???i 796 L?? ?????c Th???, P.15, Qu???n G?? V???p"}</b>
                                </h2>
                                <p><b>Chuy??n m???c:</b> Thu?? tr??? s??i g??n</p>
                                <p>
                                    <span className="bold">?????a ch???: </span>{room.address},
                                    &nbsp;{room.ward},
                                    &nbsp;{room.district},
                                    &nbsp;{room.city}
                                </p>
                                <p>
                                    <span className="bold">Chi ti???t: </span>
                                    {
                                        typeof room.addition_infor !== 'undefined' ? room.addition_infor: ""
                                    }
                                </p>
                                <p>
                                    <span className="bold">D???ch v???: </span>
                                    {
                                        typeof room.post.service !== 'undefined' && Object.keys(room.post.service).length ?
                                            Object.entries(room.post.service).forEach((key, index) => {
                                                if(index > 0) {
                                                    return (
                                                        <span key={index}>{key[1]} </span>
                                                    )
                                                }
                                            })

                                            : `Cho thu?? c??n h??? mini cao c???p t???i 796 L?? ?????c Th???, Ph?????ng 15, Qu???n G?? V???p, Tp. H??? Ch?? Minh.

                                            Di???n t??ch 30m2, gi?? 2.5 tri???u - 3 tri???u/th??ng.
                                            
                                            C?? h???m gi??? xe, c?? thang m??y, gi??? t??? do, c?? b???o v??? 24/24.
                                            
                                            Wifi c???c m???nh, m??y n?????c n??ng, tr?????ng h??nh c??p, s??n t???p th??? d???c v?? th?? gi??n. Chung c?? cao c???p, an ninh tuy???t ?????i.
                                            
                                            .`
                                    }
                                </p>
                                <p>
                                    <span className="bold">Di???n t??ch: </span> {room.area} (m2)
                                </p>
                                <p>
                                    <span className="bold">Gi?? c???: </span> {room.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                </p>
                                <p>
                                    <span
                                        className="bold">Li??n H???: </span> {room.host.name} - {room.host.phone} - {room.host.email}
                                </p>
                                </div>
                            </div>
                            : ''
                    }

                    <Map style={{height:"1000px"}}/>
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
                        <Button variant="primary" disabled={isShowPhone} onClick={showFullPhone} style={styleButton}>Hi???n s??? ??i???n tho???i</Button>
                        <Button variant={!isFavourite ? 'primary':'danger'} style={styleButton} onClick={favourite}>Y??u th??ch</Button>
                        <Button variant="primary" disabled={isShowPhone} onClick={showFullPhone} style={styleButton}>Li??n h???</Button>
                    </Card.Body>
                </Card>:''
                }
                <div className="">
                <div>
                    {rooms.filter(val => val.status === 1 && parseFloat(val.id) !== parseFloat(id)).slice(0,5).map((item, i) => {
                        let img = "no-img.png";
                        if (typeof item.image !== 'undefined' && item.image.length) {
                            if (typeof item.image[0].name !== 'undefined') {
                                img = item.image[0].name;
                            }
                        }
                        return (
                            <div key={i}>
                                <Card style={{margin:'5px'}}>
                                    <Card.Img variant="top"
                                        src={`${CLOUD_IMG}${img}`} style={styelCardImageRoom}/>
                                    <Card.Body>
                                        <Card.Title>{item.address && item.address}</Card.Title>
                                        <Card.Text>
                                            {item.addition_infor && item.addition_infor} <br />
                                            Gi??: <span className="fw-bold"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />
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
            </Col>
            </Row>
        </Container>
    );
};

export default RoomDetail;