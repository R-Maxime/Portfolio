import { Component } from 'react';

interface TechnoCardProps {
  technos: string[];
}

class TechnoCard extends Component<TechnoCardProps> {
  render() {
    const { technos } = this.props;

    return (
      <div className="work-card_technologies ">
        {technos.map((techno, index) => (
          techno && (
            <div
              key={`${techno}-${index}`}
              className='word-card_technologie'
            >
              {techno}
            </div>
          )
        ))}
      </div>
    );
  }
}

export default TechnoCard;
