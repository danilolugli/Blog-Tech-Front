import { render, screen } from '@testing-library/react';
import ButtonSideBar from './ButtonSideBar';

describe('ButtonSideBar', () => {
  it('deve renderizar o botão com o texto interno', () => {
    render(<ButtonSideBar>Clique Aqui</ButtonSideBar>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-sidebar');
  });

  it('deve repassar outras propriedades corretamente', () => {
    const handleClick = vi.fn();
    render(<ButtonSideBar onClick={handleClick} disabled>Clique Aqui</ButtonSideBar>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    
    expect(button).toBeDisabled();
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
