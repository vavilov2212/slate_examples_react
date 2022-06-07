import bold from '../icons/bold.svg';
import italic from '../icons/italic.svg';
import underline from '../icons/underline.svg';
import link from '../icons/link.svg';
import list_numbered from '../icons/list_numbered.svg';
import list_bulleted from '../icons/list_bulleted.svg';
import block_quote from '../icons/block_quote.svg';
import table from '../icons/table.svg';
import table_check from '../icons/table_check.svg';
import image from '../icons/image.svg';
import video from '../icons/video.svg';

const markIcons: any = {
  regular: null,
  bold: bold,
  italic: italic,
  underline: underline,
  sup: bold,
  sub: bold,
  link: link,
  list_numbered: list_numbered,
  list_bulleted: list_bulleted,
  heading: null as any,
  block_quote: block_quote,
  table: table,
  table_check: table_check,
  image: image,
  video: video,
};

export default markIcons;
