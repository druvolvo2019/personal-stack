export default function(IsTuda, IsPublic) {
  if (typeof IsTuda === 'undefined' || typeof IsPublic === 'undefined') {
    throw new Error('IsTuda or IsPublic is not defined!!!');
  } else if (IsTuda === null || IsPublic===null) {
    throw new Error('IsTuda or IsPublic is null');
  } else if (IsTuda === 1) {
    return 'Urban School District';
  } else if (IsPublic===true){
    return 'Public School District';
  } else if (IsPublic===false){
    return 'Non-public School District';
  }
  
}
