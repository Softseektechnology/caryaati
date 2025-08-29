import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import styles from "./Faq.module.css";

const FAQPage = () => {
  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.header}>Get answers to your queries</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Top Questions</h2>
        <Accordion defaultActiveKey={null}>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What are the driving license requirements?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  You will need to bring your driving license with you to pick up your hire car. Car hire companies expect drivers to have held their full license for at least two years. Provisional licenses and Copy version aren't accepted. When you hire a car abroad in some countries you will need an International Driving Permit (IDP), as well as your own driving license. If you have a UK driving license, you may be asked for a code at the car hire counter. Please visit the DVLA* website (https://www.gov.uk/view-driving-licence) before your trip. <strong>IMPORTANT NOTE:</strong> You will find more specific driving license requirements in Terms and Conditions of each car during the booking process. If you still have any questions, please feel free to contact us.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What is an insurance excess?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Insurance excess is the amount you pay towards a claim before the insurance covers the rest. Contact us for more details.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What are the age requirements for hiring a car?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  The minimum age is typically 21, with some companies requiring drivers to be 25. Check with the provider.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What you'll need to bring to collect the car?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Bring your driving license, passport, and booking confirmation.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What payment methods are accepted on Caryyati.com?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  We accept credit/debit cards and certain digital wallets. Check at checkout.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    Will I have to leave a deposit when I pick my car up?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Yes, a refundable deposit may be required. Details vary by provider.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    Can I pick up my car at one location and return it at a different location?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Yes, some providers offer one-way rentals. Additional fees may apply.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    Can I reserve a specific make, model, or color of the car?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Specific requests are subject to availability. Contact the provider.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    Will I have to pay for anything when I collect my car?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Additional fees may apply (e.g., deposit, insurance). Check terms.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
        </Accordion>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Booking Related Q/A</h2>
        <Accordion defaultActiveKey={null}>
          <Card className={styles.faqCard}>
            <Card.Header className={styles.faqHeader}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Button
                    variant="link"
                    className={styles.toggle}
                    onClick={() => {}}
                  >
                    What if I haven't received any confirmation of my booking?
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  Check your email (including spam). Contact us if not received.
                </Accordion.Body>
              </Accordion.Item>
            </Card.Header>
          </Card>
        </Accordion>
      </section>
    </div>
  );
};

export default FAQPage;