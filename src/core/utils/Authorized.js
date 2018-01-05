import RenderAuthorized from '../../components/Authorized/index';
import { getAuthority } from './authority';

const Authorized = RenderAuthorized(getAuthority());
export default Authorized;
