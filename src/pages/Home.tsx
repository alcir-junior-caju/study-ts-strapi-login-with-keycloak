import { useState } from 'react';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const providersNames = [
  'keycloak',
  'discord',
  'facebook',
  'github',
  'google',
  'instagram',
  'linkedin',
  'reddit',
  'twitch',
  'twitter',
  'vk',
  'auth0',
];

type LoginButtonProps = {
  providerName: string;
};

const LoginButton = (props: LoginButtonProps) => (<a href={`${backendUrl}/api/connect/${props.providerName}`}>
    <button style={{ width: '150px' }}>Connect to {props.providerName}</button>
  </a>);

type LogoutButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const LogoutButton = (props: LogoutButtonProps) => <button onClick={props.onClick}>Logout</button>;

const Home = () => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName) => <li key={providerName}>
        <LoginButton providerName={providerName}/>
        </li>)}
    </ul>;
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return <div>
    <p>{text}</p>
    {buttons}
  </div>;
}

export default Home;
