import { Frame } from "@gptscript-ai/gptscript";

const renderEventMessage = (event: Frame) => {
  switch (event.type) {
    case "runStart": {
      return <div> Run started at {event.start}</div>;
    }
    case "callStart": {
      return (
        <div>
          Story generation in progress with with tool {event.tool?.description}
        </div>
      );
    }
    case "callProgress": {
      return (
        <div>
          Story generation progress:{" "}
          {event.output[event.output.length - 1].content}
        </div>
      );
    }
    case "runFinish": {
      return <div>Story generation completed</div>;
    }
    case "callSubCalls": {
      return event.output?.map((call, index) => (
        <div key={index}>
          <div>{call.content}</div>
          {call.subCalls &&
            Object.keys(call.subCalls).map((subCall) => (
              <div key={subCall}>
                <strong>
                  {subCall}: {call.subCalls[subCall].toolID}
                </strong>
                <div>Tool ID: {call.subCalls[subCall].toolID}</div>
                <div>Input: {call.subCalls[subCall].input}</div>
              </div>
            ))}
        </div>
      ));
    }
    default:
      return <div>{JSON.stringify(event, null, 2)}</div>;
  }
};

export default renderEventMessage;
