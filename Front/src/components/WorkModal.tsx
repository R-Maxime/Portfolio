/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import IWork from '../datas/Models/Work';
import InputField from './InputField';
import WorkCard from './WorkCard';
import Work from '../datas/Work';
import i18n from '../langs/i18n';
import '../styles/Admin.scss';
import { Navigate } from 'react-router-dom';

const GET_RANDOM_ID = () => Math.floor(Math.random() * 1000000).toString();

interface WorkModalProps {
  preFilledData?: IWork;
}

interface State {
  DEFAULT_WORK_DATA: IWork;
  workData: IWork;
  previewWork: IWork;
}

class WorkModal extends Component<WorkModalProps, State> {
  randomId: string;

  defaultColor: string;

  isPreFilledData: boolean;

  constructor(props: WorkModalProps) {
    super(props);

    this.randomId = GET_RANDOM_ID();
    this.defaultColor = '#6366F1';

    const preFilledData = props.preFilledData || this.generateDefaultWorkData();

    this.isPreFilledData = !!props.preFilledData;

    this.state = {
      DEFAULT_WORK_DATA: preFilledData,
      workData: preFilledData,
      previewWork: {
        id: this.randomId,
        title: '',
        description: '',
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
    const randomId = GET_RANDOM_ID();
    return {
      id: randomId,
      title: '',
      description: '',
      repoUrl: '',
      webUrl: '',
      color: this.defaultColor,
      logo: this.isPreFilledData ? '' : new File([], ''),
      images: this.isPreFilledData ? [] : [new File([], '')],
      technologies: []
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
    this.randomId = GET_RANDOM_ID();
    this.setState({
      DEFAULT_WORK_DATA: this.generateDefaultWorkData(),
      workData: this.generateDefaultWorkData(),
      previewWork: {
        id: this.randomId,
        title: '',
        description: '',
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

  renderInput() {
    const { workData } = this.state;
    return (
      <div className='flex column'>
        <InputField label='Titre' id='title' value={workData.title} onChange={(value) => this.setWorksData({ ...workData, title: value })} />
        <InputField label='Description' id='description' value={workData.description} onChange={(value) => this.setWorksData({ ...workData, description: value })} />
        <InputField label='Repo GitHub' id='repoUrl' value={workData?.repoUrl ?? ''} onChange={(value) => this.setWorksData({ ...workData, repoUrl: value })} />
        <InputField label='Site web' id='webUrl' value={workData?.webUrl ?? ''} onChange={(value) => this.setWorksData({ ...workData, webUrl: value })} />
        <InputField label='Technologies (à séparer avec une virgule)' id='technologies' value={workData.technologies?.join(',')} onChange={(value) => this.setWorksData({ ...workData, technologies: value.split(',') })} />
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
        <input type='file' id='logo' onChange={(e) => { if (e.target.files) { this.setWorksData({ ...workData, logo: e.target.files[0] }); } }} />
      </div>
    );
  }

  render() {
    const { workData, previewWork } = this.state;
    return (
      <div className='work-add-container'>
        <div className='work-modal-container content-container flex width-25 column'>
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
              <button onClick={() => Work.deleteWork(Number(workData.id)).then(() => Navigate({ to: '/admin/works' }))} type='button'>
                {i18n.admin.delete.fr}
              </button>
            )}
          </div>
        </div>
        <div className='work-modal-container content-container flex width-25 height-25 column'>
          <WorkCard key={previewWork.id} admin={true} {...previewWork} />
        </div>
      </div>
    );
  }
}

export default WorkModal;
