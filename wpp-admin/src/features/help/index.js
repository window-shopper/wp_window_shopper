import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { routes } from '../../consts';
import navigate from '../drawer/navigate';

export default function () {
  const dispatch = useDispatch();
  return (
    <div style={{ padding: '5%', maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        What is this about?
      </Typography>
      <Typography variant="body2" gutterBottom>
        I created
        {' '}
        <b>Window Shopper</b>
        {' '}
        to help you display products on your website the easy way. Because dealing with HTML and CSS while additionally managing hundreds of Product Boxes all by yourself definitely isn&apos;t.
        <br />
        <br />
        All you need to know is how to use Wordpress&apos; shortcode functionality and you are good to go. It should not take you longer than 3 minutes to create your first Product Box and use it via it&apos;s assigned shortcode.
        <br />
        <br />
        <br />
      </Typography>
      <Typography variant="h4" gutterBottom>
        How do I get started?
      </Typography>
      <Typography variant="body2" gutterBottom>
        The idea was for you (the user) to be able to make adjustments to hundreds of Product Boxes with just one click. And for that to be possible there needed to be a Template system.
        <br />
        {' '}
        Let&apos;s have a look at how that workds together:
        <ol>
          <li>
            Get started by creating your first Template
            {' '}
            <a href="" onClick={(e) => { e.preventDefault(); navigate(routes.create_new_template, dispatch); }}>here</a>
          </li>
          <li>Select one of the layouts</li>
          <li>
            Click
            {' '}
            <i>Next</i>
            {' '}
            in the bottom left corner
          </li>
          <li>Use the expandable editors on the left hand side to customize your Template</li>
          <li>
            As soon as you like what you see click
            {' '}
            <i>Next</i>
            {' '}
            again
          </li>
          <li>Give your Template a Name</li>
          <li>
            Click
            {' '}
            <i>Save</i>
            {' '}
            to finish.
          </li>
        </ol>
        Great! You have just designed your first Template. Let&apos;s put it to use by creating a Product Box with it.
        <ol>
          <li>
            Start creating your first Product Box
            {' '}
            <a href="" onClick={(e) => { e.preventDefault(); navigate(routes.create_new_product_box, dispatch); }}>here</a>
          </li>
          <li>Select the Template you have just created</li>
          <li>
            Click
            {' '}
            <i>Next</i>
            {' '}
          </li>
          <li>Again, use the expandable editors to fill your Product Box with your content</li>
          <li>
            Once more, click
            {' '}
            <i>Next</i>
            {' '}
          </li>
          <li>Now you can give your Product Box a name</li>
          <li>Optional: Create a category so you have an easier time managing your Product Boxes later on</li>
          <li>
            Click
            {' '}
            <i>Save</i>
            {' '}
            to finish.
          </li>
        </ol>
        You may create as many Product Boxes from the same Template as you want.
        <br />
        If it is the first Product Box you have ever created it will have the shortcode
        {' '}
        <i>[wpws id=1]</i>
        {' '}
        assigned to it.
        <br />
        <br />
        <br />
      </Typography>
      <Typography variant="h4" gutterBottom>
        What is so special about Templates?
      </Typography>
      <Typography variant="body2" gutterBottom>
        Great Question! Imagine you have just created 20 Product Boxes and suddenly realise that the colors you chose for them do not quite match the theme of your website.
        <br />
        <br />
        That would be unfortunate, to say the least - If it wasn&apos;t for the hidden Template functionality.
        <br />
        Because all you really need to do now is to edit the Template these 20 Product Boxes are based on, adjust the color just once, and all 20 Product Boxes will be updated automatically. Templates are not just a way for you to create multiple product Boxes faster, but also enable you to manage countless Product Boxes efficiently.
        <br />
        <br />
        <br />
      </Typography>
      <Typography variant="h4" gutterBottom>
        FAQs:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Q: What is a shortcode and how to I use them?
        <br />
        A: Shortcodes are a very useful feature built into Wordpress. I couldn&apos;t explain it better than
        {' '}
        <a href="https://www.smashingmagazine.com/2012/05/wordpress-shortcodes-complete-guide/" target="_blank" rel="noopener nofollow">this article</a>
        {' '}
        does.
        <br />
        <br />
        Q: How do I select an Image for my Product Box?
        <br />
        A: I have integrated a way for you to select images from you own library. You can find it in the
        {' '}
        <i>Image</i>
        {' '}
        editor when editing a Product Box. You may also use any URL by just pasting it into the
        {' '}
        <i>URL</i>
        {' '}
        textfield.
        <br />
        <br />
        Q: Why does XYZ not work?
        <br />
        A: Because I'm just one single developer. But I&apos;m trying my best to keep this plugin as bug-free as possbile. Feels free to contact me when you encounter any issues!
        <br />
        <br />
      </Typography>
      <Typography style={{ display: 'flex', alignItems: 'center' }} variant="h5" gutterBottom>
        <ErrorOutlineIcon style={{ marginRight: 7 }} />
        {' '}
        Experimental:
      </Typography>
      <Typography variant="body2" gutterBottom>
        This plugin comes with one more feature. However, it is currently an experimental implementation. That doesn&apos;t mean it will break your site, but it might not work quite as expected! I decided to leave it in the source code and it is up to you whether you want to use it or not.
        <br />
        <br />
        This experimental feature let&apos;s you display multiple Product Boxes right next to each other, as long as there is enough space. If there isn&apos;t, the boxes will re-adjust to be displayed below one another vertically.
        <br />
        To access this feature you can use multiple Product Box IDs within the same shortcode, like this
        <br />
        <br />
        <i>[wpws ids=&quot;1,2,3&quot;]</i>
        .
        <br />
        <br />
        Again, this is experimental and might not always look as expected. But in case you enjoy the feature let me know and I will continue developing it.
      </Typography>
    </div>
  );
}
