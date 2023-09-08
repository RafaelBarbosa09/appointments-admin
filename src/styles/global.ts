import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --title: #6e6d7a;
    --text-input: #fefefe;
    --text: #0d0c22;
    --shape: #ffffff;
    --background: #f4f3ef;
    --danger: #d32f2f;
    --success: #4caf50;
    --warning: #ffc107;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 1080px) {
        font-size: 93.75%;
    }

    @media(max-width: 720px) {
        font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textArea, button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: var(--white);
  }

  button, input[type="checkbox"] {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;