import React from 'react';

export default function TodoItem(props) {
    const {data, changeStatus} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const className = 'todo-item ui-state-default ' + (completed === true ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="checkbox">
                <label checked={completed} onChange={handleChange}>
                </label>
            </div>
        </li>
    );
}