import { render, screen } from '@testing-library/react';
import PersonDetail from '../pages/persons/[id]';

describe('PersonDetail Component', () => {
  it('renders person details correctly', () => {
    const mockPerson = {
      id: '1',
      name: 'John Doe',
      relatedPersonId: '2',
    };

    const mockDetails = {
      id: '1',
      age: 30,
      address: '123 Main St',
      relatedPersons: [
        { id: '2', relation: 'Friend' },
      ],
    };

    render(<PersonDetail person={mockPerson} details={mockDetails} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age: 30')).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Main St')).toBeInTheDocument();
    expect(screen.getByText('ID: 2, Relation: Friend')).toBeInTheDocument();
  });
});
