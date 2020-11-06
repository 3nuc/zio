import "@testing-library/jest-dom";
import { config } from "@vue/test-utils";
import _ from "lodash";

config.global.mocks = {
  $t: jest.fn(_.identity),
};
