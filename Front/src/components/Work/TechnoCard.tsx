import { Component } from 'react';
import { ITechnologies } from '../../datas/Models/Work';

class TechnoCard extends Component<{ technologies: ITechnologies[] }> {
  render() {
    const { technologies } = this.props;

    return (
      <div className="work-card_technologies ">
        {technologies.map((techno, index) => (
          techno && (
            <a
              key={`${techno}-${index}`}
              className='word-card_technologie'
              href={techno.url}
            >
              <img
                className='work-card_technologie__logo'
                src={techno.icon}
                alt={techno.name + ' logo'}
              />
              {techno.name}
            </a>
          )
        ))}
      </div>
    );
  }
}

export default TechnoCard;
