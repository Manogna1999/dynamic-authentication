import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import QRCode from "qrcode";

function QR(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Set Up 2FA
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <img src={args.qr} alt="QR Code" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default QR;
