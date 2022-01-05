import {
  Card as MuiCard,
  CardContent,
  Grid,
  Typography,
  TypographyProps,
  Divider,
  CardContentProps,
  withStyles,
} from '@material-ui/core';
import React from 'react';

const Card = withStyles({
  root: {
    height: '100%',
  },
})(MuiCard);

interface TitleWithActionsProps {
  title: string;
  typographyProps?: TypographyProps;
  actions?: React.ReactElement[];
}

export const TitleWithActions: React.FC<TitleWithActionsProps> = ({
  title,
  actions,
  typographyProps,
}) => (
  <Grid container alignItems="center" justify="space-between" spacing={2}>
    <Grid item>
      <Typography {...typographyProps} variant="subtitle1">
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Grid container alignItems="center" spacing={2}>
        {actions &&
          actions.map((component, i) => (
            <Grid key={`action-${i + 1}`} item>
              {component}
            </Grid>
          ))}
      </Grid>
    </Grid>
  </Grid>
);

TitleWithActions.defaultProps = {
  typographyProps: {
    variant: 'subtitle1',
  },
};

export interface CardSectionProps extends TitleWithActionsProps {
  children?: React.ReactNode;
  cardBodyProps?: CardContentProps;
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  actions,
  children,
  cardBodyProps,
}) => {
  const defaultCardBodyProps = {};
  if (cardBodyProps) Object.assign(defaultCardBodyProps, cardBodyProps);
  return (
    <Card>
      {(title !== '' || actions) && (
        <>
          <CardContent>
            <TitleWithActions title={title} actions={actions} />
          </CardContent>
          <Divider />
        </>
      )}
      {children && <CardContent {...cardBodyProps}>{children}</CardContent>}
    </Card>
  );
};
