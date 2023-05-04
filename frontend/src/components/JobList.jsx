import React, { useState, useEffect } from 'react';
import './css/JobList.css';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import JobDetails from './jobDetails/JobDetails';

const items = [
    {
        id: 1,
        name: <p> Junior Instructor Trainee <br /> (Fullstack & Blockchain Development) </p>,
        companyname: '247Codecamp'
    },
    { id: 2, name: 'Job 2', companyname: 'Company 2' },
    {
        id: 3,
        name: <p> Junior Software Quality Assurance Professional</p>,
        companyname: 'Oracle'
    },
    { id: 4, name: 'Job 4', companyname: 'Company 4' },
    { id: 5, name: 'Job 5', companyname: 'Company 5' },
];

function JobList() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        setIsSmallScreen(window.innerWidth < 750);
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 750);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem({
            ...item,
            details: JobDetails[item.id - 1],
        });
        if (isSmallScreen) {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    return (
        <div>
            <Container>
                <Row xs={2} md={2}>
                    <Col xs={12} lg={4} >
                        <div className="jobname flex-column">
                            {items.map((item) => (
                                <Button key={item.id} onClick={() => handleItemClick(item)}>
                                    {item.name} {item.companyname}
                                </Button>
                            ))}
                        </div>

                    </Col>
                    <Col lg={8}>
                        <div className="jobdesc " >
                            {selectedItem && !isSmallScreen && (
                                <div style={{ width: '100%' }}>
                                    <p className='job-pos'>{selectedItem.name}</p>
                                    <h6>{selectedItem.companyname} </h6>

                                    <div className='buttons'>

                                        <Button> Save Job </Button>
                                        <Button> Apply Now </Button>
                                    </div>
                                    <hr />
                                    <ul scrollable>
                                        <li>
                                            <strong>Job Type: </strong>
                                            {selectedItem.details.jobType}
                                        </li>
                                        <li>
                                            <strong>Location: </strong>
                                            {selectedItem.details.location}
                                        </li>
                                        <li>
                                            <strong>Salary: </strong>
                                            {selectedItem.details.salary}
                                        </li>
                                        <li>
                                            <strong>Qualifications: </strong>
                                            <ul dangerouslySetInnerHTML={{ __html: JobDetails[selectedItem.id - 1].qualification }}>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>Job description:</strong>
                                            <ul dangerouslySetInnerHTML={{ __html: JobDetails[selectedItem.id - 1].description }}>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>Shift and Schedule: </strong>
                                            {selectedItem.details.shiftSchedule}
                                        </li>
                                        <li>
                                            <strong>Company Name: </strong>
                                            {selectedItem.details.companyname}
                                        </li>
                                        <li>
                                            <strong>Overview: </strong>
                                            {selectedItem.details.overview}
                                        </li>
                                    </ul>
                                    <hr />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem && selectedItem.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(80vh - 210px)', overflowY: 'auto' }}>
                    {selectedItem &&
                        Object.keys(selectedItem.details).map((key) => (
                            <div key={key}>
                                <strong>{key}: </strong>
                                {selectedItem.details[key]}
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default JobList;