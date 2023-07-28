import React from "react";
import {Chip} from "@mui/material";
import Colors from "../../utils/Colors";

const Tags = ({title}) => {
    return (
        <Chip
            label={title}
            variant="outlined"
            size="small"
            style={{
                borderRadius: '8px',
                borderWidth: 0,
                backgroundColor: Colors.PRIMARY_ORANGE,
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
            }}
        />
    )
}

export default Tags