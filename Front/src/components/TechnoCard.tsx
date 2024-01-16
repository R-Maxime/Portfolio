import { Component } from 'react';
import { ITechnologies } from '../datas/Models/Work';

class TechnoCard extends Component<{ technologies: ITechnologies[] }> {
  render() {
    const { technologies } = this.props;

    return (
      <div className="work-card_technologies ">
        {technologies.map((techno, index) => (
          techno && (
            <div
              key={`${techno}-${index}`}
              className='word-card_technologie'
            >
              <a href={techno.url} target="_blank">
                <img
                  className='work-card_technologie__logo'
                  src={techno.icon}
                  alt={techno.name}
                />
                {techno.name}
              </a>
            </div>
          )
        ))}
      </div>
    );
  }
}

export default TechnoCard;
