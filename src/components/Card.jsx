import styled from 'styled-components';

export default styled.div`
  div {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	margin-top: 1%;
    margin-bottom: 1%;
    
  }

  h5 {
    background: rgba(255, 254, 249, 0.75);
    border-radius: 11px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    width: fit-content;
    padding: 0 10px;
    width: 65%;
    display: flex;
  }

  h4:empty {display: none;}
  h4 {
    background: #FFFEF9;
    border-radius: 11px; 
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    width: fit-content;
    padding: 6px 10px 6px 10px;
    display: inline-block;
    color: #222222;
  }

  h3 {
    background: rgba(255, 254, 249, 0.75);
    border-radius: 11px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    width: fit-content;
    padding: 0 10px;
    float: right;
    margin: 0;
    color: #222222;
    padding: 5px;
    margin-left:80%;
    margin-bottom: 12%;
  }

  button {
    background: #FFE58A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: black;
    padding: 4px;
  }

  p {
    background: rgba(255, 254, 249, 0.75);
    border-radius: 11px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    color: #000000;
    padding: 5px;
  }
`;
