import { styled } from 'styled-components';

export const Text = styled.h2`
  color: #0E0C0C;
  font-family: 'Helvetica Neue', sans-serif;
  top: 32px;
  position: absolute;
  left: 63vh;

  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
    text-align: center;
  }
`;

export const Text2 = styled.h2`
  color: #0E0C0C;
  font-family: 'Helvetica Neue', sans-serif;
  top: 25px;
  left: 43vh;
  position: absolute;

  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
    text-align: center;
  }
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const PaginationContainer = styled.div`
  z-index: 99;
  background: #F3F1F2;
  position: relative;
  margin-top: 10vh;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const Numbutton = styled.button`
  background: #F3F1F2;
  border-style: none;
  font-size: 16px;
  font-width: 400px;
`;

export const ArrowButton = styled.button<{ disabled: boolean }>`
  z-index: 99;
  cursor: pointer;
  border-style: none;
  width: 50px;
  height: 50px;
  background: #F3F1F2;
  font-size: 16px;
  font-width: 400px;
`;

export const TodoList = styled.div`
  position: relative;
  background: #F3F1F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 93vh;
  height: 150px;
  border-radius: 16px;
  top: 19vh;
  padding: 5vh;

  @media (max-width: 768px) {
    width: 80%;
    top: 12vh;
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  background: #F3F1F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 50px;
  }
`;

export const TodoList1 = styled.div`
  position: relative;
  background: #F3F1F2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 93vh;
  height: 45px;
  border-radius: 16px;
  top: 19vh;
  padding: 5vh;

  @media (max-width: 768px) {
    width: 80%;
    top: 12vh;
  }
`;

export const Text3 = styled.p`
  color: #86797D;
  font-family: 'Helvetica Neue', sans-serif;
  position: absolute;
  background: none;
  left: 20px;
  top: 20px;

  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
    text-align: center;
  }
`;

export const Text4 = styled.p`
  color: #86797D;
  font-family: 'Helvetica Neue', sans-serif;
  position: absolute;
  background: none;
`;

export const ForEmail = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  top: 70px;
  right: 27vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    right: 30px;
    top: 50px;
    width: 35vh;
  }
`;

export const ForInput = styled.div`
  position: relative;
  top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    right: 30px;
    top: 50px;
    width: 35vh;
  }
`;

export const ForSearch = styled.div`
  position: relative;
  top: 18vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 102vh;

  @media (max-width: 768px) {
    right: 30px;
    top: 90px;
    width: 18vh;
  }
`;

export const ForPassword = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  top: 90px;
  right: 27vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    right: 30px;
    top: 70px;
    width: 35vh;
  }
`;

export const Circle = styled.span`
  position: absolute;
  z-index: 99;
  width: 16px;
  height: 16px;
  background-color: #F3F1F2;
  border-radius: 50%;
  border: 2px solid #DF2060;

@media (max-width: 768px) {
    left: 15px;
    top: 5;

  }
`;

export const Circle2 = styled.span`
  position: absolute;
  z-index: 99;
  width: 16px;
  height: 16px;
  background-color: #F3F1F2;
  border-radius: 50%;
  border: 2px solid #DF2060;

@media (max-width: 768px) {
    left: 15px;
    top: 5;

  }
`;

export const Circle3 = styled.span`
  position: absolute;
  z-index: 99;
  width: 16px;
  height: 16px;
  left: 15px;
  background-color: #F3F1F2;
  border-radius: 50%;
  border: 2px solid #DF2060;
`;

export const Input = styled.input`
  border-radius: 16px;
  width: 650px;
  height: 30px;
  padding: 14px;
  left: 0;
  padding-left: 45px;
  background: #F3F1F2;
  border-style: none;
  position: absolute;
  outline: none;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input2 = styled.input`
  border-radius: 16px;
  width: 500px;
  height: 30px;
  padding: 14px;
  left: 0;
  background: #F3F1F2;
  border-style: none;
  position: absolute;
  outline: none;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Email = styled.input`
  border-radius: 16px;
  width: 400px;
  height: 30px;
  padding: 14px;
  left: 0;
  padding-left: 45px;
  background: #F3F1F2;
  border-style: none;
  position: absolute;
  outline: none;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Password = styled.input`
  border-radius: 16px;
  left: 0;
  width: 400px;
  height: 30px;
  padding: 14px;
  padding-left: 45px;
  background: #F3F1F2;
  border-style: none;
  position: absolute;
  outline: none;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Form = styled.form``;

export const Btn1 = styled.button`
  background-color: #F3F1F2;
  width: 77px;
  height: 47px;
  position: absolute;
  top: 201px;
  right: 72vh;
  outline: none;
  border-style: none;
  border-radius: 16px;

  @media (max-width: 768px) {
    top: 25vh;
    right: 15vh;
    width: 90px;
  }
`;

export const Search = styled.button`
  background-color: #F3F1F2;
  width: 85px;
  height: 57px;
  padding: 14px;
  font-size: 16px;
  top: 0;
  margin-left: 147vh;
  margin-left: 10px;
  outline: none;
  position: absolute;
  right: 13vh;
  cursor: pointer;
  border-style: none;
  border-radius: 16px;

  @media (max-width: 768px) {
    top: 0;
    left: 21vh;
    width: 80px;
  }
`;

export const Btn2 = styled.button`
  background-color: #DF2060;
  color: #F3F1F2;
  width: 77px;
  height: 47px;
  position: absolute;
  top: 201px;
  right: 59vh;
  cursor: pointer;
  outline: none;
  border-style: none;
  border-radius: 16px;

  @media (max-width: 768px) {
    top: 25vh;
    right: 2vh;
    width: 90px;
  }
`;

export const Create = styled.button`
  background-color: #DF2060;
  color: #F3F1F2;
  width: 85px;
  height: 57px;
  top: 0px;
  right: 0;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  outline: none;
  border-style: none;
  border-radius: 16px;

  @media (max-width: 768px) {
    top: 0;
    left: 31vh;
    width: 80px;
  }
`;

export const Logout = styled.button`
  background-color: #DCD6D8;
  color: #000;
  width: 85px;
  height: 57px;
  top: 0px;
  cursor: pointer;
  right: 0;
  font-size: 20px;
  position: absolute;
  outline: none;
  border-style: none;
  border-radius: 16px;

  @media (max-width: 768px) {
    top: 0;
    right: 20px;
    width: 50px;
    height: 30px

  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const ModalButton = styled.button`
  background-color: #df2060;
  color: #fff;
  padding: 10px 20px;
  border: none;
  margin-top: 20px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #c5154b;
  }
`;
