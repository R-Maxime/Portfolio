/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import IWork, { ITechnologies } from '../../datas/Models/Work';
import InputField from '../InputField';
import WorkCard from './WorkCard';
import Work from '../../datas/Work';
import i18n from '../../langs/i18n';

import '../../styles/Admin.scss';

interface WorkModalProps {
  preFilledData?: IWork;
}

interface State {
  DEFAULT_WORK_DATA: IWork;
  workData: IWork;
  previewWork: IWork;
}

class WorkModal extends Component<WorkModalProps, State> {
  defaultColor: string;

  isPreFilledData: boolean;

  constructor(props: WorkModalProps) {
    super(props);

    this.defaultColor = '#6366F1';

    const preFilledData = props.preFilledData || this.generateDefaultWorkData();

    this.isPreFilledData = !!props.preFilledData;

    this.state = {
      DEFAULT_WORK_DATA: preFilledData,
      workData: preFilledData,
      previewWork: {
        id: '',
        title: '',
        description: '',
        longDescription: '',
        repoUrl: '',
        webUrl: '',
        color: this.defaultColor,
        logo: '',
        images: [],
        technologies: []
      }
    };
  }

  generateDefaultWorkData() {
    return {
      id: '',
      title: '',
      description: '',
      longDescription: '',
      repoUrl: '',
      webUrl: '',
      color: this.defaultColor,
      logo: this.isPreFilledData ? '' : new File([], ''),
      images: this.isPreFilledData ? [] : [new File([], '')],
      technologies: [] as ITechnologies[]
    };
  }

  setWorksData = (data: IWork) => {
    this.setState((prevState: State) => ({
      workData: data,
      previewWork: {
        ...prevState.previewWork,
        title: data.title,
        description: data.description,
        repoUrl: data.repoUrl,
        webUrl: data.webUrl,
        color: data.color,
        logo: prevState.previewWork.logo ?? '',
        images: prevState.previewWork.images ?? [],
        technologies: data.technologies
      }
    }));
  };

  imgFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  componentDidMount() {
    this.updatePreviewWork();
  }

  componentDidUpdate(prevProps: WorkModalProps, prevState: State) {
    if (prevProps.preFilledData !== this.props.preFilledData) {
      const preFilledData = this.props.preFilledData || this.generateDefaultWorkData();

      this.setState({
        DEFAULT_WORK_DATA: preFilledData,
        workData: preFilledData,
        previewWork: {
          ...preFilledData
        }
      });
    }

    if (prevState.workData.logo !== this.state.workData.logo) {
      this.updatePreviewWork();
    }
  }

  rerender() {
    this.setState({
      DEFAULT_WORK_DATA: this.generateDefaultWorkData(),
      workData: this.generateDefaultWorkData(),
      previewWork: {
        id: '',
        title: '',
        description: '',
        longDescription: '',
        repoUrl: '',
        webUrl: '',
        color: this.defaultColor,
        logo: '',
        images: [],
        technologies: []
      }
    });
  }

  updatePreviewWork() {
    const { workData } = this.state;
    if (workData.logo && workData.logo instanceof File) {
      this.imgFileToBase64(workData.logo).then((data) => {
        this.setState((prevState: State) => ({
          previewWork: {
            ...prevState.previewWork,
            logo: data as string
          }
        }));
      });
      return;
    }

    this.setState((prevState: State) => ({
      previewWork: {
        ...prevState.previewWork,
        logo: workData.logo as string
      }
    }));
  }

  updateColorInputs() {
    document.getElementById('color')?.setAttribute('value', this.state.workData.color);
    document.getElementById('color-picker')?.setAttribute('value', this.state.workData.color);
  }

  setNewTechnoData = (data: ITechnologies, index: number) => {
    const { workData } = this.state;
    const updatedTechnologies = [...workData.technologies];
    const updatedTechno = { ...updatedTechnologies[index], ...data };

    updatedTechnologies[index] = updatedTechno;
    this.setWorksData({ ...workData, technologies: updatedTechnologies });
  };

  deleteTechno(index: number) {
    const { workData } = this.state;
    const updatedTechnologies = [...workData.technologies];
    updatedTechnologies.splice(index, 1);
    this.setWorksData({ ...workData, technologies: updatedTechnologies });
  }

  displayTechnologies() {
    return (
      <div className='flex column' style={{
        gap: '20px',
        padding: '10px'
      }}>
        {this.state.workData.technologies.map((techno, index) => (
          <div className='flex column gap-8 pad-top-8' key={index} style={{
            border: '1px solid white',
            borderRadius: '5px',
            padding: '10px'
          }}>
            <div className="flex gap-8">
              <label htmlFor={`techno-${index}`}>{techno.name} (techno {index + 1}) </label>
              <div onClick={() => this.deleteTechno(index)} style={{ cursor: 'pointer', fontSize: '20px' }}>🗑️</div>
            </div>
            <InputField label='Nom' id='techno-nom' value={techno.name} onChange={(value) => this.setNewTechnoData({
              ...techno,
              name: value
            }, index)} />
            <InputField label='Icon' id='techno-icon' value={techno.icon} onChange={(value) => this.setNewTechnoData({
              ...techno,
              icon: value
            }, index)} />
            <InputField label='URL' id='techno-url' value={techno.url} onChange={(value) => this.setNewTechnoData({
              ...techno,
              url: value
            }, index)} />
          </div>
        ))}
      </div>
    );
  }

  addNewTechnoModal() {
    const { workData } = this.state;
    const updatedTechnologies = [...workData.technologies];
    updatedTechnologies.push({
      name: '',
      icon: '',
      url: ''
    });
    this.setWorksData({ ...workData, technologies: updatedTechnologies });
  }

  renderInput() {
    const { workData } = this.state;
    return (
      <div className='flex column'>
        <InputField label='ID (obligatoire)' id='id' value={workData.id} onChange={(value) => this.setWorksData({ ...workData, id: value })} />
        <InputField label='Titre (obligatoire)' id='title' value={workData.title} onChange={(value) => this.setWorksData({ ...workData, title: value })} />
        <InputField label='Description (obligatoire)' id='description' value={workData.description} onChange={(value) => this.setWorksData({ ...workData, description: value })} />
        <InputField label='Description longue' id='longDescription' value={workData.longDescription} onChange={(value) => this.setWorksData({ ...workData, longDescription: value })} />
        <InputField label='Repo GitHub' id='repoUrl' value={workData?.repoUrl ?? ''} onChange={(value) => this.setWorksData({ ...workData, repoUrl: value })} />
        <InputField label='Site web' id='webUrl' value={workData?.webUrl ?? ''} onChange={(value) => this.setWorksData({ ...workData, webUrl: value })} />

        {workData.technologies && workData.technologies.length > 0 && this.displayTechnologies()}
        <div className='flex column gap-8 pad-top-8'>
          <button onClick={() => this.addNewTechnoModal()} type='button'>
            {i18n.admin.addTechno.fr}
          </button>
        </div>

        <div className='flex column gap-8 pad-top-8'>
          <label htmlFor='color'>{i18n.admin.color.fr}</label>
          <input type='text' id='color' value={workData.color} onChange={(e) => {
            this.setWorksData({ ...workData, color: e.target.value });
            this.updateColorInputs();
          }} />
          <input type='color' id='color-picker' onChange={(e) => {
            this.setWorksData({ ...workData, color: e.target.value });
            this.updateColorInputs();
          }} style={{ backgroundColor: workData.color, width: '100%', height: '100%' }} />
        </div>
        <label htmlFor='images'>{i18n.admin.images.fr}</label>
        <input type='file' id='images' key={workData.images?.length} multiple onChange={(e) => this.setWorksData({ ...workData, images: Array.from(e.target.files ?? []) })} />
        <label htmlFor='logo'>{i18n.admin.logo.fr}</label>
        <input type='file' id='logo' onChange={(e) => {
          if (e.target.files) {
            this.setWorksData({ ...workData, logo: e.target.files[0] });
          }
        }} />
      </div>
    );
  }

  render() {
    const { workData, previewWork } = this.state;
    return (
      <div className='center-50'>
        <div style={{ paddingTop: '10px' }}>
          <WorkCard key={previewWork.id} admin={true} {...previewWork} />
        </div>
        <div className='content-container flex column'>
          <div className='work-modal-header'>
            <h3>{i18n.admin.addProject.fr}</h3>
          </div>
          {this.renderInput()}
          <div style={{ paddingTop: '10px', gap: '5px', display: 'flex' }}>
            <button onClick={() => this.rerender()} type='button'>
              {i18n.admin.cancel.fr}
            </button>
            <button onClick={() => this.isPreFilledData
              ? Work.updateWork(workData).then(() => this.rerender())
              : Work.addWork(workData).then(() => this.rerender())} type='button'>
              {i18n.admin.add.fr}
            </button>
            {this.isPreFilledData && (
              <button onClick={() => Work.deleteWork(workData.id).then(() => { window.location.href = '/admin/works'; })} type='button'>
                {i18n.admin.delete.fr}
              </button>
            )}
          </div>
        </div>
      </div >
    );
  }
}

export default WorkModal;
