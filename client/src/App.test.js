import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';
import NewBreed from './components/NewBreed/NewBreed.js'; 


describe('Form mounted', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(<NewBreed/>);
  });
  it('Label with Name', ()=>{
    const {container} = render(<NewBreed/>)
    const element= container.querySelectorAll('label')[0]
    expect(element.innerHTML).toBe('Name*');
  })
});

