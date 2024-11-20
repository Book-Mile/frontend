import React from "react";
import styled from "styled-components";

const ModalButtonCancel = () => {
    return (
        <CencelButton>
            취소
        </CencelButton>
    );
};

const CencelButton = styled.div`
    color: black; /* 가독성을 위해 텍스트 색상 수정 */
    border : 1px solid #D2D2D2;
    font-size: 18px;
    width: 122px;
    height: 38px;

    background: #FFF;
    border-radius: 10px;

    display: flex; /* 중앙 정렬 */
    align-items: center;
    justify-content: center;

    cursor: pointer; /* 커서를 포인터로 변경 */

    /* 호버 효과 */
    &:hover {
        background: #D9D9D9; /* 더 어두운 색 */
        transition: background 0.3s ease; /* 부드러운 전환 효과 */
        color : black
    }
`;

export default ModalButtonCancel;