
import React, { Component } from 'react';

import { Button, Icon, Form, Radio } from 'semantic-ui-react';


class ListDisplayControls extends Component {
  styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      background: '#e0e1e2 none'
    }
  };

  handleFilterChange = (event, { value }) => {
    const { onFilterChange } = this.props;
    onFilterChange(value);
  };

  handleDirectionChange = (event, { value }) => {
    const { onDirectionChange } = this.props;
    onDirectionChange(value);
  };

  render() {
    const {
      direction: selectedDirection,
      filter: selectedOption,
      options
    } = this.props;

    const SelectOption = ({ optionName, selectedOption, handleChange }) => (
      <Form.Field>
        <Radio
          label={optionName}
          name="radioGroup"
          value={optionName}
          checked={selectedOption === optionName}
          onChange={handleChange}
        />
      </Form.Field>
    );

    return (
      <Form>
        <Form.Group inline style={this.styles.container}>
          {options.map(option => (
            <SelectOption
              key={option}
              optionName={option}
              selectedOption={selectedOption}
              handleChange={this.handleFilterChange}
            />
          ))}
          <Form.Field>
            {
              selectedDirection === 'asc' ?
                <Button
                  active={selectedDirection === 'asc'}
                  value="desc"
                  onClick={this.handleDirectionChange}
                >
                  <Button.Content visible>
                    <Icon name="caret up" />
                  </Button.Content>
                </Button>
                :
                <Button
                  active={selectedDirection === 'desc'}
                  value="asc"
                  onClick={this.handleDirectionChange}
                >
                  <Button.Content visible>
                    <Icon name="caret down" />
                  </Button.Content>
                </Button>
            }

          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default ListDisplayControls;
