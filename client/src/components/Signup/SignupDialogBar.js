import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const SignupDialogBar = (props) => {

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor: 'black',
      zIndex: 10000,
      display: 'flex',
      paddingLeft: '24px',
      paddingRight: '24px',
      height: '64px',
    }}
    >
      <div style={{
        marginTop: '8px',
        marginRight: '8px',
        marginLeft: '-16px',
      }}
      >
        <button
          onClick={props.onCloseClick}
          style={{
            border: '10px',
            boxSizing: 'border-box',
            display: 'inline-block',
            cursor: 'pointer',
            textDecoration: 'none',
            margin: '0px',
            padding: '12px',
            outline: 'none',
            fontSize: '0px',
            fontWeight: 'inherit',
            position: 'relative',
            zIndex: 10001,
            overflow: 'visible',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            width: '48px',
            height: '48px',
            background: 'none',
          }}
        >
          <div>
            <FontIcon className="material-icons" color={'white'}>close</FontIcon>
          </div>
        </button>
      </div>
      <h1
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: '0px',
          paddingTop: '0px',
          letterSpacing: '0px',
          fontSize: '24px',
          fontWeight: 400,
          color: '#fff',
          height: '64px',
          lineHeight: '64px',
          flex: '1 1 0%',
        }}
      >
        {`${props.dialogTitle}`}

      </h1>
      <div
        style={{
          marginTop: '8px',
          marginRight: '-16px',
          marginLeft: 'auto',
        }}
      >
        <button
          onClick={props.onSaveClick}
          style={{
            border: '10px',
            boxSizing: 'border-box',
            display: 'inline-block',
            fontFamily: 'Roboto, sans-serif',
            cursor: 'pointer',
            textDecoration: 'none',
            margin: '7px 48px 7px 0px',
            padding: '0px',
            outline: 'none',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            position: 'relative',
            zIndex: 10001,
            height: '36px',
            lineHeight: '36px',
            minWidth: '88px',
            color: '#fff',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            borderRadius: '2px',
            userSelect: 'none',
            overflow: 'hidden',
            backgroundColor: '#000',
            textAlign: 'center',
          }}
        >
          <div>
            <span style={{
              position: 'relative',
              paddingLeft: '16px',
              paddingRight: '16px',
              verticalAlign: 'middle',
              letterSpacing: '0px',
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: '14px',
            }}
            >
              Save
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SignupDialogBar;

