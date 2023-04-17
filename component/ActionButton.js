import React, { useState } from "react";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

export const ActionButton = (props,handleNext, handleBack, handleFinish) => {
    
  
    return (
      <div style={{float:'right'}}>
        <Row style={{display:'flex', gap:10}}>
          {props.currentStep > 1 && (
            <Col>
              <Button style={{border:'none', float:'right', padding:10, backgroundColor:'lightgrey', color:'black', borderRadius:5}} onClick={handleBack}>Back</Button>
            </Col>
          )}
          <Col>
            {props.currentStep < props.totalSteps && (
              <Button style={{border:'none', float:'right', padding:10, backgroundColor:'lightgreen', color:'slategray', borderRadius:5}} onClick={handleNext}>Next</Button>
            )}
            {props.currentStep === props.totalSteps && (
              <Button style={{border:'none', float:'right', padding:10, backgroundColor:'black', color:'white', borderRadius:5}} onClick={handleFinish}>Finish</Button>
            )}
          </Col>
        </Row>
      </div>
    );
  };
