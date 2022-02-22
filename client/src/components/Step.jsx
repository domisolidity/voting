import React, {  useState,useEffect } from 'react'

const Step = (props) => {
    const currentStep = props.step

    return (
    <>
        현재 스텝: <span>{currentStep}</span>
    </>

    )
}

export default Step