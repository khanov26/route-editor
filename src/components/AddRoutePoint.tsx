import React, {useState} from 'react';

type Props = {
    onAdd: (title: string) => void;
};

const AddRoutePoint: React.FC<Props> = ({onAdd}) => {
    const [title, setTitle] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.currentTarget.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (title) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="Новая точка маршрута" value={title}
                   onChange={handleChange}/>
        </form>
    );
};

export default AddRoutePoint;