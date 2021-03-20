import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import loadingSVG from '../../assets/loading.svg'
import ReactHtmlParser from 'react-html-parser'; 

const ShowDetail = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    let { identifier } = useParams();

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                let url = `https://aia-flickr-backend.herokuapp.com/details?photo_id=${identifier}`
                let response = await axios.get(url)
                setData(response.data.photo)
                setLoading(false)
            } catch (e) {
                console.log(e.message);
                setLoading(true)
            }
        };
        getData();
    }, [identifier]);

    return (
        <Container className="my-4">
            {loading &&
                <div className="d-flex align-items-center">
                    <img src={loadingSVG} style={{ width: '100%', height: '150px' }} alt="Loading..." />
                </div>
            }
            <Row>
                {!loading && data &&
                    <Col xs={12}>
                        <div className="d-flex align-items-center justify-content-end">
                            <Link className="btn btn-secondary" to="/">Home</Link>
                        </div>
                        <Card className="mt-2 shadow-lg">
                            <Card.Img
                                className="imageCardShow"
                                variant="center"
                                src={`https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`}
                                alt="image not found"
                                rounded="true"
                            />
                            <Card.Body>
                                <Card.Text className="text-capitalize font-weight-bold">
                                   Title : {data.title._content ? data.title._content : "Title is undifined"}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Text className="text-capitalize font-weight-bold">
                                    Owner : {data.owner.realname ? data.owner.realname : "Owner name is undifined"}
                                </Card.Text>
                                <Card.Text className="text-muted">
                                    Description : {data.description._content ? ReactHtmlParser(data.description._content) : "Description is undifined"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>
        </Container>
    );
}

export default ShowDetail;