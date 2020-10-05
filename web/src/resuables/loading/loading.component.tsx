import React from 'react';
import { Backdrop, withStyles, CircularProgress, Theme } from '@material-ui/core';


interface LoadingProps {
    isLoading: boolean;
    classes: any;
}

const useStyles = withStyles((theme: Theme) => ({
    backdropRoot: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

class LoadingComponent extends React.Component<LoadingProps> {
    render() {
        return (
            <Backdrop open={this.props.isLoading} classes={{
                root: this.props.classes.backdropRoot
            }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}
export default useStyles(LoadingComponent);