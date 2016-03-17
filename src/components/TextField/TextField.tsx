import * as React from 'react';
import Label from '../Label/index';
import './TextField.scss';
import { css } from '../../utilities/css';

export interface ITextFieldProps extends React.DOMAttributes {
  children?: any;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  underlined?: boolean;
  placeholder?: string;
  label?: string;
  description?: string;
  iconClass?: string;
  value?: string;
  onChanged?: (newValue: any) => void;
  className?: string;
}

export interface ITextFieldState {
  value: string;
}

export default class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static initialProps: ITextFieldProps = {
    disabled: false,
    required: false,
    multiline: false,
    underlined: false
  };

  public refs: {
    [key: string]: React.ReactInstance;
    multilineText: HTMLInputElement;
    singlelineText: HTMLInputElement;
  };

  public constructor(props: ITextFieldProps) {
    super(props);

    this.state = {
      value: props.value
    };
    this._onMultilineTextChanged = this._onMultilineTextChanged.bind(this);
    this._onSinglelineTextChanged = this._onSinglelineTextChanged.bind(this);
  }

  public componentWillReceiveProps(newProps: ITextFieldProps) {
    if (newProps.value !== undefined) {
      this.setState({
        value: newProps.value
      });
    }
  }

  public render() {
    let {disabled, required, multiline, placeholder, underlined, label, description, iconClass, className } = this.props;
    let { value } = this.state;

    return (
      <div
        {...this.props}
        className={
        css('ms-TextField', className, {
          'is-required': required,
          'is-disabled': disabled,
          'ms-TextField--multiline': multiline,
          'ms-TextField--underlined': underlined
        }) }
        >
        { label ? <Label>{label}</Label> : null }
        {iconClass ? <i className={iconClass}></i> : null}
        {multiline ?
          <textarea className='ms-TextField-field' ref='multilineText' onChange={ this._onMultilineTextChanged }>{value}</textarea>
        :
          <input placeholder={placeholder} ref='singlelineText' className='ms-TextField-field' value={value} onChange={ this._onSinglelineTextChanged } /> }
        {description ? <span className='ms-TextField-description'>{description}</span> : null}
        {this.props.children}
      </div>
    );
  }

  private _onMultilineTextChanged(ev: React.KeyboardEvent): void {
    this.setState({
      value: this.refs.multilineText.value
    });

    this._onChanged(this.refs.multilineText.value);
  }

  private _onSinglelineTextChanged(ev: React.KeyboardEvent): void {
    this.setState({
      value: this.refs.singlelineText.value
    });
    this._onChanged(this.refs.singlelineText.value);
  }

  private _onChanged(newValue: string): void {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(newValue);
    }
  }
}
