import CreateTurnForm from '../../components/Appointments/CreateTurnForm';
import Activities from '../../components/Actuivities/Activities';

const CreateTurnFormView = () => {

    const handleSubmit = (formData) => {
        const dataToSend = {...formData };
        console.log('Data to send:', dataToSend);
    };
    
    return (
        <div>
            <CreateTurnForm onSubmit={handleSubmit} />
            <Activities/>
        </div>
    );
};

export default CreateTurnFormView;