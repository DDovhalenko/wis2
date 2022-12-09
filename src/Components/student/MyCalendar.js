//Author : Dmytro Dovhalenko xdovha00

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../Styles/student/MyCalendar.css'

const MyCalendar = (props)=>{
    const localizer = momentLocalizer(moment);

    return(
    <div className="Calendar" style={{ height: '500pt' }}>
          <Calendar
            events={props.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
    );
}

export default MyCalendar