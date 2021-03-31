import React from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

import { useToast } from '~/hooks';

import { Container, Toast } from './styles';
import { Props } from './types';

const icons = {
  info: <FiInfo size="2.4rem" />,
  error: <FiAlertCircle size="2.4rem" />,
  success: <FiCheckCircle size="2.4rem" />,
};

const ToastContainer: React.FC<Props> = ({ messages, ...rest }) => {
  const { removeToast } = useToast();

  return (
    <Container {...rest}>
      {messages.map(({ id, type, title, description }) => (
        <Toast key={id} {...{ type }}>
          {icons[type || 'info']}
          <div>
            <strong>{title}</strong>
            {description && <p>{description}</p>}
          </div>
          <button type="button" onClick={() => removeToast(id)}>
            <FiXCircle size="1.8rem" />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
