/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Stack, StackSeparator } from "@chakra-ui/react";

import type { DagParamsSpec, ParamSpec } from "src/queries/useDagParams";

import { Accordion, Alert } from "../ui";
import { Row } from "./Row";

type FlexibleFormProps = {
  readonly params: DagParamsSpec;
};

export type FlexibleFormElementProps = {
  readonly key: string;
  readonly name: string;
  readonly param: ParamSpec;
};

const FlexibleForm = ({ params }: FlexibleFormProps) => {
  const processedSections = new Map();

  return (
    <>
      <Stack separator={<StackSeparator />}>
        {Object.keys(params).length > 0 && (
          <Alert
            status="warning"
            title="Population of changes in trigger form fields is not implemented yet. Please stay tuned for upcoming updates... and change the run conf in the 'Advanced Options' conf section below meanwhile."
          />
        )}
        {Object.entries(params)
          .filter(([, param]) => typeof param.schema.section !== "string")
          .map(([name, param]) => (
            <Row key={name} name={name} param={param} />
          ))}
      </Stack>
      {Object.entries(params)
        .filter(([, secParam]) => secParam.schema.section)
        .map(([, secParam]) => {
          const currentSection = secParam.schema.section;

          if (processedSections.has(currentSection)) {
            return undefined;
          } else {
            processedSections.set(currentSection, true);

            return (
              <Accordion.Root
                collapsible
                key={secParam.schema.section}
                mb={4}
                mt={4}
                size="lg"
                variant="enclosed"
              >
                <Accordion.Item value={secParam.schema.section ?? ""}>
                  <Accordion.ItemTrigger cursor="button">{secParam.schema.section}</Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Stack separator={<StackSeparator />}>
                      {Object.entries(params)
                        .filter(([, param]) => param.schema.section === currentSection)
                        .map(([name, param]) => (
                          <Row key={name} name={name} param={param} />
                        ))}
                    </Stack>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
            );
          }
        })}
    </>
  );
};

export default FlexibleForm;
