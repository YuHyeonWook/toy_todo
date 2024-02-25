const Comp = ({ a, b, c }) => {
  console.log("컴포넌트가 호출되었다.");
  return <div>Comp</div>;
};

function areEqual(prevProps, nextProps) {
  if (prevProps.a === nextProps.a) {
    return true;
  } else {
    return false;
  }
}
const MemoizedComp = React.memo(Comp, areEqual);
