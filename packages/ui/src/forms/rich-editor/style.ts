import styled from 'styled-components';

import { COLORS, FONTS } from '../../styles';

export const Container = styled.div`
  .rich-editor {
    border: 1px solid #0f0912;
    background-color: transparent;
    color: ${COLORS.gray};
    border-radius: 0;
  }

  .toolbar {
    border-bottom: 1px solid #0f0912;
    background: transparent;
    color: ${COLORS.gray};
    ${FONTS.chakra};
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    display: flex;
    padding: 0;
    margin: 0;

    > div {
      border-right: 1px solid #0f0912;
      margin: 0;
      padding-left: 16px;
      padding-right: 16px;
      height: 40px;
      display: flex;
      align-items: center;

      :first-child {
        padding: 0 !important;
      }

      :last-child {
        border-right: 0;
      }

      > span {
        > select {
          width: 120px;
          outline: none;
          background-color: transparent !important;
          border: 0 !important;
          color: ${COLORS.gray} !important;
          padding-left: 10px !important;
          font-size: 16px;

          :hover,
          :focus,
          :focus-visible,
          :active {
            background-color: transparent !important;
            border: 0 !important;
            color: ${COLORS.gray} !important;
            outline: none !important;
          }

          + span {
            border: 0 !important;
            background-color: transparent !important;
            font-size: 16px;
          }
        }
      }
    }

    button[type='button'] {
      background: transparent;
      color: ${COLORS.gray};
      ${FONTS.chakra};
      font-weight: 400;
      font-size: 40px;
      line-height: 24px;
      border: 0;
      width: 42px;
      background-repeat: no-repeat;
      background-position: center center;

      > span {
        display: none;
      }

      &.toolbarConfigBold {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuOTIgMC4xOTk5OTlIMTAuMzUyTDEyLjU2IDIuNDA4VjcuMDY0TDExLjQwOCA4LjIxNkwxMy4zMDQgMTAuMTEyVjE0LjY0OEwxMC45NTIgMTdIMC45MlYwLjE5OTk5OVpNOS41ODQgNy43ODRMMTAuNzg0IDYuNTg0VjIuOTZMOS41ODQgMS43ODRIMi42OTZWNy43ODRIOS41ODRaTTEwLjEzNiAxNS40MTZMMTEuNTI4IDE0LjA0OFYxMC42ODhMMTAuMTM2IDkuMzJIMi42OTZWMTUuNDE2SDEwLjEzNloiIGZpbGw9IiNBMDczQTciLz4KPC9zdmc+Cg==');
      }

      &.toolbarConfigITALIC {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjE2MDE4IDAuMDExNzE4OEg1LjkxMDE4SDE1LjE5ODVIMTUuOTQ4NVYxLjUxMTcySDE1LjE5ODVIMTIuMDI2NkwxMS43NTEzIDIuMTA4MDVMNS41NzQgMTUuNDkyM0gxMC4wMzgzSDEwLjc4ODNWMTYuOTkyM0gxMC4wMzgzSDAuNzVIMFYxNS40OTIzSDAuNzVIMy45MjE5NUw0LjE5NzE3IDE0Ljg5NTlMMTAuMzc0NSAxLjUxMTcySDUuOTEwMThINS4xNjAxOFYwLjAxMTcxODhaIiBmaWxsPSIjQTA3M0E3Ii8+Cjwvc3ZnPgo=');
      }

      &.toolbarConfigSTRIKETHROUGH {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuNTYgMTQuNzkyVjEzLjI1NkgyLjM2VjE0LjE5MkwzLjUxMiAxNS4zNjhIOS4yNzJMMTAuNDcyIDE0LjE0NFYxMC4zNzZMOS4yNzIgOS4ySDIuODE2TDAuNjA4IDYuOTkyVjIuNDA4TDIuODE2IDAuMTk5OTk5SDkuODcyTDEyLjA4IDIuNDA4VjMuOTY4SDEwLjMwNFYzLjAwOEw5LjEwNCAxLjgzMkgzLjYwOEwyLjQwOCAzLjAwOFY2LjM5MkwzLjYwOCA3LjU2OEgxMC4wNjRMMTIuMjcyIDkuNzc2VjE0Ljc0NEwxMC4wMTYgMTdIMi43NjhMMC41NiAxNC43OTJaIiBmaWxsPSIjQTA3M0E3Ii8+CjxwYXRoIGQ9Ik0tMSA5Ljg0OEgxMy43MTJWMTEuMDQ4SC0xVjkuODQ4WiIgZmlsbD0iI0EwNzNBNyIvPgo8L3N2Zz4K');
      }

      &.toolbarConfigUNDERLINE {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuODY5MjE5IDE0LjM2VjAuMTk5OTk5SDIuNjkzMjJWMTMuNzZMNC4zMjUyMiAxNS4zNjhIOS43OTcyMkwxMS40MjkyIDEzLjc2VjAuMTk5OTk5SDEzLjI1MzJWMTQuMzZMMTAuNjEzMiAxN0gzLjUwOTIyTDAuODY5MjE5IDE0LjM2WiIgZmlsbD0iI0EwNzNBNyIvPgo8cGF0aCBkPSJNLTEuMDUwNzggMTkuNEgxNS4xNzMyVjIwLjZILTEuMDUwNzhWMTkuNFoiIGZpbGw9IiNBMDczQTciLz4KPC9zdmc+Cg==');
      }

      &.toolbarConfigUL {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyMCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMUgxOSIgc3Ryb2tlPSIjQTA3M0E3IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik02IDdIMTkiIHN0cm9rZT0iI0EwNzNBNyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNiAxM0gxOSIgc3Ryb2tlPSIjQTA3M0E3IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIwLjUiIHN0cm9rZT0iI0EwNzNBNyIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iNyIgcj0iMC41IiBzdHJva2U9IiNBMDczQTciLz4KPGNpcmNsZSBjeD0iMSIgY3k9IjEzIiByPSIwLjUiIHN0cm9rZT0iI0EwNzNBNyIvPgo8L3N2Zz4K');
      }

      &.toolbarConfigOL {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgNEgxOCIgc3Ryb2tlPSIjQTA3M0E3IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik01IDEwSDE4IiBzdHJva2U9IiNBMDczQTciIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUgMTZIMTgiIHN0cm9rZT0iI0EwNzNBNyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMS40Nzk5NCAyLjExNUwwLjcxNDk0MSAyLjUxVjEuOTc1TDEuNTc5OTQgMS41SDIuMDU5OTRWNUgxLjQ3OTk0VjIuMTE1Wk0wLjMwMzk4NCAxMC4yNjVMMi4xMTM5OCA4LjU3NVY4LjE5TDEuOTE4OTggOEgxLjA1ODk4TDAuODYzOTg0IDguMTlWOC41MTVIMC4yODM5ODRWOC4wMTVMMC43OTg5ODQgNy41SDIuMTc4OThMMi42OTM5OCA4LjAxNVY4Ljc0NUwwLjg5ODk4NCAxMC40VjEwLjUwNUgyLjcxMzk4VjExSDAuMzAzOTg0VjEwLjI2NVpNMC4yMTMxODQgMTYuNDg1VjE1Ljk5SDAuNzkzMTg0VjE2LjMxTDAuOTg4MTg0IDE2LjVIMS45MzgxOEwyLjEzMzE4IDE2LjMxVjE1LjY3NUwxLjk0ODE4IDE1LjQ5SDAuOTQ4MTg0VjE0Ljk5SDEuOTQ4MThMMi4xMzMxOCAxNC44MDVWMTQuMTlMMS45MzgxOCAxNEgxLjAxODE4TDAuODIzMTg0IDE0LjE5VjE0LjUxSDAuMjQzMTg0VjE0LjAxNUwwLjc1ODE4NCAxMy41SDIuMTk4MThMMi43MTMxOCAxNC4wMTVWMTQuOTc1TDIuNDQzMTggMTUuMjRMMi43MTMxOCAxNS41MVYxNi40ODVMMi4xOTgxOCAxN0gwLjcyODE4NEwwLjIxMzE4NCAxNi40ODVaIiBmaWxsPSIjQTA3M0E3Ii8+Cjwvc3ZnPgo=');
      }

      &.toolbarConfigBlockquote {
      }
    }

    @media (max-width: 767px) {
      display: flex;
      flex-flow: wrap;
    }
  }

  .editor {
    background-color: transparent;
    color: ${COLORS.white};
    ${FONTS.baiJamjuree};
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;

    div[role='textbox'] {
      padding: 20px !important;
    }
  }
`;
